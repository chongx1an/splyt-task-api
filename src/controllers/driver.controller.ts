import axios from 'axios'
import { JsonController, Get, QueryParam } from 'routing-controllers'

interface Coordinate {
  latitude: number,
  longitude: number,
  bearing: number,
}

interface Driver {
  driver_id: string,
  location: Coordinate
}

interface ListDriversResponse {
  pickup_eta: number,
  drivers: Driver[]
}

@JsonController()
export class DriverController {
  @Get('/drivers')
  async list(
    @QueryParam('latitude') latitude: number,
    @QueryParam('longitude') longitude: number,
    @QueryParam('count', { required: false }) count: number = 10
  ) {
    const response = await axios.get<ListDriversResponse>('https://qa-interview-test.splytech.dev/api/drivers', {
      params: {
        latitude: latitude,
        longitude: longitude,
        count: count
      }
    })

    if (!response.data.drivers) {
      throw new Error('Failed to retrieve drivers')
    }

    return response.data
  }
}
