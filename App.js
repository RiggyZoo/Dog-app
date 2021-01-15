import React from 'react';
import Header from "./Component/header";
import './app.css';
import {DogService} from "./Component/Service";



class App extends React.Component {
    dogService = new DogService();
    state = {
        currentImg:null,
        likedPictures:[],
        liked : true,
        breedTitle: null,
    }

    onPicLoaded = (dogPicture) => {
        this.setState({
            currentImg:dogPicture.message,
        })
        this.comparePics();
        this.onBreedTitleChange();
    }

    comparePics (){
        let current = this.state.currentImg;
        let likedPics = [...this.state.likedPictures];
        for (let key of likedPics){
            if(key == current){
                return  this.setState({
                    liked: true,
                })
            }
        }
        return this.setState({
            liked: false,
        })
    }
    
    componentDidMount(){
        this.dogService.getRandomPics()
            .then(this.onPicLoaded);
    }

    nextPic = () => {
        this.dogService.getRandomPics()
            .then(this.onPicLoaded)
    }

   likedImg = (dogPicture) => {
        let likedPictures = [...this.state.likedPictures,dogPicture];

        this.setState({
            likedPictures: likedPictures
        })
        this.nextPic();

   }

   chooseBreed = () => {
        const breed = document.getElementById("breed");
        this.dogService.getBreedImage(breed.value)
            .then(this.onPicLoaded)
    }

    onBreedTitleChange = () => {
        const breed = this.state.currentImg;
        const title = breed.substring(30).substr(0,breed.indexOf("/")-1);

        this.setState({
            breedTitle:title
        })
    }


    render() {
        const {liked,currentImg,breedTitle} = this.state;
        const buttonLike = !liked  ? (<button
            onClick = {()=>this.likedImg(currentImg)}
            className ="btn">Like</button>): (<button className="btn" style={{color: 'green', border:'1px solid green'}}>Liked <i class="far fa-thumbs-up"></i></button>) ;
        return (
            <div className="app">
                <Header/>
                <div className ='img-block'>
                    <img src={currentImg} alt="dog"/>

                </div>
                <h1>{breedTitle}</h1>
                <div className = 'btn-group'>
                    <button
                        onClick={this.nextPic}
                        className="btn">Next picture</button>
                    {buttonLike}
                </div>
                <section className="container">
                    <div className="dropdown">
                        <select
                            onChange={this.chooseBreed}
                            id="breed"
                            className="dropdown-select">
                            <label><h3>hello</h3></label>
                            <option value = "akita">Akita</option>
                            <option value = "african">African</option>
                            <option value = "beagle">Beagle</option>
                            <option value = "borzoi">Borzoi</option>
                            <option value = "boxer">Boxer</option>
                            <option value = "chow">Chow</option>
                            <option value = "cockapoo">Cockapoo</option>
                            <option value = "dingo">Dingo</option>
                            <option value = "husky">Husky</option>
                            <option value = "pug">Pug</option>
                            <option value = "whippet">Whippet</option>
                        </select>

                    </div>
                </section>


            </div>

        )
    }
}

export default App;

