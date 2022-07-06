/* eslint-disable */
import {connect, LocalVideoTrack} from 'twilio-video'
import {GaussianBlurBackgroundProcessor, VirtualBackgroundProcessor} from '@twilio/video-processors';

const SCREEN_NAME = 'SCREEN';
const CHANGE_BACKGROUND_TYPE = {
  IMAGE: 'image',
  BLUR: 'blur'
}

class TwilioService {
  acceptToken;
  localTrack = false;
  remoteTrack = '';
  activeRoom = '';
  previewTracks = '';
  identity = '';
  roomName = null;
  processor = null;
  screenTracks = null;
  refRemoteTrack = null;
  refLocalTrack = null;
  refScreenTrack = null;
  userShare = false;

  constructor(acceptToken, refRemote, refLocal, refScreen) {
    this.acceptToken = acceptToken
    this.refRemoteTrack = refRemote
    this.refScreenTrack = refScreen
    this.refLocalTrack = refLocal
  }

  connectTwilio(roomName) {
    const _this = this
    this.roomName = roomName
    const connectOptions = {
      name: roomName,
      // logLevel: 'debug',
      audio: true,
      video: {width: 900, height: 600}
    }

    connect(this.acceptToken, connectOptions).then(function (room) {
      _this.activeRoom = room
      // Attach the Tracks of the Room's Participants.
      room.participants.forEach(function (participant) {
        _this.listeningParticipant(participant)
      })
      // When a Participant joins the Room, log the event.
      room.on('participantConnected', function (participant) {
        console.log("Joining: '" + participant.identity + "'")
        _this.listeningParticipant(participant)
      })
      // When a Participant adds a Track, attach it to the DOM.
      room.on('trackAdded', function (track, participant) {
        console.log(participant.identity + ' added track: ' + track.kind)
        _this.attachTracks([track], _this.remoteTrack)
      })
      // When a Participant removes a Track, detach it from the DOM.
      room.on('trackRemoved', function (track, participant) {
        console.log(participant.identity + ' removed track: ' + track.kind)
        _this.detachTracks([track])
      })
      // When a Participant leaves the Room, detach its Tracks.
      room.on('participantDisconnected', function (participant) {
        console.log("Participant '" + participant.identity + "' left the room")
        _this.clearTracks(_this.refRemoteTrack)
      })

      // if local preview is not active, create it
      if (!_this.localTrack) {
        _this.attachTracks(room.localParticipant.tracks, _this.refLocalTrack)
      }
    })
  }

  listeningParticipant(participant) {
    participant.on('trackSubscribed', (track) => {
      console.log('trackSubscribed', track)
      if (track.name === SCREEN_NAME) {
        this.userShare = true
        this.attachTracks([track], this.refScreenTrack)
      } else {
        this.attachTracks([track], this.refRemoteTrack)
      }
    })
    participant.on('trackUnsubscribed', (track) => {
      console.log('trackUnsubscribed', track)
      if (track.name === SCREEN_NAME) {
        this.userShare = false
      }
      track.detach().forEach((element) => {
        element.remove()
      })
    })
  }

  // Attach the Tracks to the DOM.
  attachTracks(tracks, container) {
    tracks.forEach(function (publication) {
      if (publication.track !== undefined) {
        container.appendChild(publication.track.attach())
      } else {
        container.appendChild(publication.attach())
      }
    })
  }

  clearTracks(container) {
    container.innerHTML = ''
  }

  // Attach the Participant's Tracks to the DOM.
  attachParticipantTracks(participant, container) {
    const tracks = Array.from(participant.tracks.values())
    this.attachTracks(tracks, container)
  }

  // action blur
  async changeBackground(type, image) {
    if (this.processor) {
      this.activeRoom.localParticipant.videoTracks.forEach((publication) => {
        publication.track.removeProcessor(this.processor)
      })
      this.processor = null
    }
    if (type === CHANGE_BACKGROUND_TYPE.BLUR) {
      const bg = new GaussianBlurBackgroundProcessor({
        assetsPath: '/js',
        maskBlurRadius: 20,
        blurFilterRadius: 5,
      });
      await bg.loadModel();
      this.processor = bg
      this.activeRoom.localParticipant.videoTracks.forEach((publication) => {
        publication.track.addProcessor(bg)
      })
    } else if (type === CHANGE_BACKGROUND_TYPE.IMAGE) {
      let img = await this.getImage(image);
      const bg = new VirtualBackgroundProcessor({
        assetsPath: '/js',
        backgroundImage: img,
        maskBlurRadius: 5,
      });
      await bg.loadModel();
      this.processor = bg
      this.activeRoom.localParticipant.videoTracks.forEach((publication) => {
        publication.track.addProcessor(bg)
      })
    }
  }

  getImage(url) {
    return new Promise(function (resolve, reject) {
      let img = new Image()
      img.src = url
      img.onload = function () {
        resolve(img)
      }
      img.onerror = function () {
        reject(url)
      }
    })
  }

  // Detach the Tracks from the DOM.
  detachTracks(tracks) {
    tracks.forEach((track) => {
      track.detach().forEach((detachedElement) => {
        detachedElement.remove()
      })
    })
  }

  // Detach the Participant's Tracks from the DOM.
  detachParticipantTracks(participant) {
    const tracks = Array.from(participant.tracks.values())
    this.detachTracks(tracks)
  }

  // Share screen
  async shareScreen() {
    const stream = await navigator.mediaDevices.getDisplayMedia({video: {frameRate: 15}})
    this.screenTracks = new LocalVideoTrack(stream.getTracks()[0], {name: SCREEN_NAME})
    this.screenTracks.mediaStreamTrack.onended = () => {
      this.stopShareScreen()
    }
    await this.activeRoom.localParticipant.publishTrack(this.screenTracks)
  }

  stopShareScreen() {
    this.activeRoom.localParticipant.unpublishTrack(this.screenTracks)
    this.screenTracks.stop()
    this.screenTracks = null
  }

  muteAudio() {
    this.activeRoom.localParticipant.audioTracks.forEach((audioTrack) => {
      audioTrack.track.disable()
    })
  }

  unmuteAudio() {
    this.activeRoom.localParticipant.audioTracks.forEach((audioTrack) => {
      audioTrack.track.enable()
    })
  }

  stopVideo() {
    this.activeRoom.localParticipant.videoTracks.forEach((videoTrack) => {
      videoTrack.track.disable()
    })
  }

  startVideo() {
    this.activeRoom.localParticipant.videoTracks.forEach((publication) => {
      publication.track.enable()
    })
  }

  // Leave Room.
  leaveRoomIfJoined() {
    this.clearTracks(this.refLocalTrack)
    this.activeRoom.disconnect()
  }
}

export default TwilioService
