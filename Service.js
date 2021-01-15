export class DogService {

    getRandomPics = async ()=>{
        const result = await fetch("https://dog.ceo/api/breeds/image/random");
        if(!result.ok){
            throw new Error (`Could not fetch "https://dog.ceo/api/breed/hound/images/random", status: ${result.status}`)
        }
        const data = await result.json();
        return this._transformDog(data);
    }
    getBreedImage = async (breed) =>{
        const result = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
        if(!result.ok){
            throw new Error (`Could not fetch "https://dog.ceo/api/breed/hound/images/random", status: ${result.status}`)
        }
        const data = await result.json();

        return this._transformDog(data);
    }

    _transformDog(dog){
        return {
            message:dog.message,
            status: dog.status
        }
    }
}
