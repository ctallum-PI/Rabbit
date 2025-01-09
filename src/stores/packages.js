import { defineStore } from 'pinia'
import { RabbitData } from '@/data/RabbitData';

export const usePackageStore = defineStore('data', {
    state: () => ({
        stopNumber: null,
        nPackages: null,
        packagesToDeliver: [],
        packagesDelivered: [],
        packagesScanned: [],
        activelyBeingDelivered: [],
        deliverPhoto: null,

    }),
    actions: {
        initialize(stopNumber) {
            this.stopNumber = stopNumber;
            if (stopNumber == RabbitData.length){
                this.nPackages = null;
                this.packagesToDeliver = 
                this.packagesDelivered = 
                this.packagesScanned = Array(this.nPackages).fill(false)
                this.activelyBeingDelivered = Array(this.nPackages).fill(false)
            } else {
                this.nPackages = RabbitData[stopNumber].numPackages;
                this.packagesToDeliver = Array(this.nPackages).fill(false)
                this.packagesDelivered = Array(this.nPackages).fill(false)
                this.packagesScanned = Array(this.nPackages).fill(false)
                this.activelyBeingDelivered = Array(this.nPackages).fill(false)
            }
        },
        scanPackage(index) {
            this.packagesScanned[index] = true;
            this.packagesToDeliver[index] = true;
        },
        deliverPackage(index) {
            this.packagesToDeliver[index] = false;
            this.packagesDelivered[index] = true;
            this.activelyBeingDelivered[index] = false;
        },
        activateDelivery(index) {
            this.activelyBeingDelivered[index] = !this.activelyBeingDelivered[index];
        },
        savePhoto(url) {
            this.deliverPhoto = url;
            console.log(url);
        }
    },
}

)