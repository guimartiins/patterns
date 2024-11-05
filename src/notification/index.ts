interface WeatherObserver {
    update(temperature: number): void
}

interface WeatherSubject {
    subscribe(observer: WeatherObserver): void
    unsubscribe(observer: WeatherObserver): void
    notify(message: any): void
}

class WeatherNotificationService implements WeatherSubject {
    private observers: Set<WeatherObserver> = new Set()

    constructor() {
    }


    subscribe(observer: WeatherObserver): void {
        if (!this.observers.has(observer)) {
            this.observers.add(observer)
        }
    }
    unsubscribe(observer: WeatherObserver): void {
        if (this.observers.has(observer)) {
            this.observers.delete(observer)
        }
    }
    notify(temperature: number): void {
        console.log(`Broadcasting weather temperature ${temperature} to all observers`)

        this.observers.forEach((observer) => {
            observer.update(temperature)
        })
    }
}

class WeatherDisplay implements WeatherObserver {
    update(temperature: number): void {
        console.log(`Displaying temperature ${temperature} Celsius to Times Square...`)
    }
}

class WeatherLogger implements WeatherObserver {
    update(temperature: number): void {
        console.log(`Sending ${temperature} Celsius to Logger...`)
    }
}

class EmergencyAlertSystem implements WeatherObserver {
    update(temperature: number): void {
        if (temperature > 33) {
            return console.log(`DANGER!\n Elevated temperature: ${temperature} Celsius.`)
        }

        if (temperature < 0) {
            return console.log(`Heavy snow approaching!`)
        }

        console.log('temperature is neutral, Do nothing.')
    }
}

function execute() {
    const weatherNotificationService = new WeatherNotificationService()

    // subscribers
    const weatherDisplay = new WeatherDisplay()
    const weatherLogger = new WeatherLogger()
    const emergencyAlertSystem = new EmergencyAlertSystem()


    weatherNotificationService.subscribe(weatherDisplay)
    weatherNotificationService.subscribe(weatherLogger)
    weatherNotificationService.subscribe(emergencyAlertSystem)

    weatherNotificationService.notify(35)
}

execute()