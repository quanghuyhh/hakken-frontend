import UserRepository from '~/repositories/UserRepository'
import RegisterRepository from '~/repositories/RegisterRepository'
import AddressRepository from '~/repositories/AddressRepository'
import PurposeRepository from '~/repositories/PurposeRepository'
import DestinationRepository from '~/repositories/DestinationRepository'
import FavoriteRepository from '~/repositories/FavoriteRepository'
import DepartureRepository from '~/repositories/DepartureRepository'
import ConsultationRepository from '~/repositories/ConsultationRepository'
import OnlineMeeting from '~/repositories/OnlineMeeting'
import PlanRepository from '~/repositories/PlanRepository'
import ItineraryRepository from '~/repositories/ItineraryRepository'

class Repository {
  constructor ($axios) {
    this.user = UserRepository($axios)
    this.register = RegisterRepository($axios)
    this.address = AddressRepository($axios)
    this.purpose = PurposeRepository($axios)
    this.favorite = FavoriteRepository($axios)
    this.destination = DestinationRepository($axios)
    this.departure = DepartureRepository($axios)
    this.consultation = ConsultationRepository($axios)
    this.onlineMeeting = OnlineMeeting($axios)
    this.plan = PlanRepository($axios)
    this.itinerary = ItineraryRepository($axios)
  }
}

export default Repository
