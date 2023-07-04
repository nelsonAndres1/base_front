import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor() { }

  getIpAddress(): Promise<string> {
    return axios.get('https://api.ipify.org?format=json')
      .then(response => response.data.ip)
      .catch(error => {
        console.error('Error retrieving IP address:', error);
        return null;
      });
  }
}