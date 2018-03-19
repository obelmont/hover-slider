/**
 * Hoverslide Object
 * @param {scrollDuration} number
 * NB: This will need to be rebuilt functionally for my sanity.
 */

class HoverSlide {
  constructor(targetElement) {

    this.targetElement = '.hoverslide';

    //If options passed
    if (targetElement) {
      this.targetElement = targetElement;
    }

    this.target = document.querySelectorAll(this.targetElement);
    this.slideshow = [];
    this.slideshow.maximumHeight = 0;


    for (let h = this.target.length - 1; h >= 0; h--) {
      this.slideshow[h] = {};
      this.slideshow[h].container = this.target[h];
      this.slideshow[h].slides = this.slideshow[h].container.getElementsByClassName("hs__slide");
      for (var v = this.slideshow[h].slides.length - 1; v >= 0; v--) {
        this.slideshow[h].slides[v].style.display = "block";
        //console.log(this.slideshow[h].slides[v].offsetHeight);
        if (this.slideshow.maximumHeight < this.slideshow[h].slides[v].offsetHeight) {
          this.slideshow.maximumHeight = this.slideshow[h].slides[v].offsetHeight;
        }
        this.slideshow[h].slides[v].style.display = "none";
      }
    }
    //console.log(this.slideshow.maximumHeight);


    for (let i = this.target.length - 1; i >= 0; i--) {
      const index = i;

      this.slideshow[i] = {};
      this.slideshow[i].container = this.target[i];
      this.slideshow[i].slides = this.slideshow[i].container.getElementsByClassName("hs__slide"); //.getElementsByTagName("img");
      this.slideshow[i].hoverslide = [];

      //create hover elements
      this.slideshow[i].hoverContainer = document.createElement("div");
      this.slideshow[i].hoverContainer.classList.add("hoverslide__hcontainer");
      this.slideshow[i].container.appendChild(this.slideshow[i].hoverContainer);

      //setheight
      this.slideshow[i].container.style.cssText =  `height: ${this.slideshow.maximumHeight}px;`; 


      //Loop and create hover triggers
      for (var s = 0; s < this.slideshow[index].slides.length; s++) {
      //for (var s = this.slideshow[index].slides.length - 1; s >= 0; s--) {
        const indi = s;
        const hselement = document.createElement("div");
        this.slideshow[i].hoverContainer.appendChild(hselement);
        this.slideshow[i].hoverslide[s] = hselement;
        this.slideshow[i].hoverslide[s].index = s;

        //Make first slide visible
        if (s === 0) {
          this.slideshow[i].slides[s].classList.add("hs--active");
          this.slideshow[i].slides[s].style.display = "block";
          if (window.innerWidth <= 768) {
            this.slideshow[i].hoverContainer.style.cssText =  `height: ${this.slideshow[i].slides[s].offsetHeight}px;`;
            this.slideshow[i].container.style.cssText = `height: ${this.slideshow[i].slides[s].offsetHeight}px;`;
          }
        }

        //immediate invoked function for preservation of variables in event listener
        (global => {
          const sliderNumber = i;
          const slideNumber = s;
          this.slideshow[i].hoverslide[s].addEventListener("mouseover", (hselement, indi) => {

            //Disable on faded
            //if (!this.slideshow[i].container.closest('.projects-project').classList.contains('faded')) {
              for (
                var sn = this.slideshow[sliderNumber].slides.length - 1;
                sn >= 0;
                sn--
              ) {
                this.slideshow[sliderNumber].slides[sn].classList.remove(
                  "hs--active"
                );
                this.slideshow[sliderNumber].slides[sn].style.display = "none";
              }

              this.slideshow[i].slides[slideNumber].classList.add("hs--active");
              this.slideshow[i].slides[slideNumber].style.display = "block";

              //Set height of hovercontainer
              if (window.innerWidth <= 768) {
                //console.log(`yeah inner width ${window.innerWidth}`);
                //console.log(this.slideshow[i].hoverContainer);
                this.slideshow[i].hoverContainer.style.cssText =  `height: ${this.slideshow[sliderNumber].slides[slideNumber].offsetHeight}px;`;
                this.slideshow[i].container.style.cssText = `height: ${this.slideshow[sliderNumber].slides[slideNumber].offsetHeight}px;`;
              }
            //}
          });
        })(window);


      }
    }
  }
  // no methods
  getMaxHeight(){
      let resizeHeight = 0;
      for (let h = this.target.length - 1; h >= 0; h--) {
        this.slideshow[h] = {};
        this.slideshow[h].container = this.target[h];
        this.slideshow[h].slides = this.slideshow[h].container.getElementsByClassName("hs__slide");
        this.slideshow[h].hoverContainer = this.slideshow[h].container.querySelector('.hoverslide__hcontainer');
        //console.log(this.slideshow[h].hoverContainer)

        //Set heights based off viewport width
        for (var v = this.slideshow[h].slides.length - 1; v >= 0; v--) {
          if (this.slideshow[h].slides[v].classList.contains('hs--active')) {
            //console.log('current');
            if (window.innerWidth <= 768) {
              console.log(this.slideshow[h].slides[v].offsetHeight);
                resizeHeight = this.slideshow[h].slides[v].offsetHeight;
                this.slideshow[h].hoverContainer.style.cssText =  `height: ${this.slideshow[h].slides[v].offsetHeight}px;`;
                this.slideshow[h].container.style.cssText = `height: ${this.slideshow[h].slides[v].offsetHeight}px;`;

                // this.slideshow[i].hoverContainer.style.cssText =  `height: ${this.slideshow[sliderNumber].slides[slideNumber].offsetHeight}px;`;
                // this.slideshow[i].container.style.cssText = `height: ${this.slideshow[sliderNumber].slides[slideNumber].offsetHeight}px;`;

            }
            else if (resizeHeight < this.slideshow[h].slides[v].offsetHeight) {
              resizeHeight = this.slideshow[h].slides[v].offsetHeight;
            }
          }
          else{
            //console.log('notcurrent')
            if (window.innerWidth > 768) {
              console.log('shouldnotfireonmobile')
              this.slideshow[h].slides[v].style.display = "block";
                if (resizeHeight < this.slideshow[h].slides[v].offsetHeight) {
                  resizeHeight = this.slideshow[h].slides[v].offsetHeight;
                }
              this.slideshow[h].slides[v].style.display = "none";
            }
          }
        }
      }

      this.slideshow.maximumHeight = resizeHeight;

      if (window.innerWidth > 768) {
        //console.log('should not fire on mobile');
        for (let i = this.target.length - 1; i >= 0; i--) {
          this.slideshow[i].container.style.cssText =  `height: ${this.slideshow.maximumHeight}px;`;
        }
      }

      //console.log(this.slideshow.maximumHeight);
  }
}
