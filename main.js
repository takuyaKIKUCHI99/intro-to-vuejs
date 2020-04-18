// ------------------- Product --------------------
Vue.component("product", {
  template: `
  <div>
    <div class="card md:flex">

      <img class="card__img w-64 shadow-md rounded-sm" 
          :src="variables[displayItem].img" 
          :class="{'card__img--inactive': !variables[displayItem].hasStock}">
      </img>

      <div class="card__info py-4 px-6 w-full flex flex-col justify-between">

        <div class="product-info">
          <p class="text-2xl">{{ name }}</p>

          <div class="flex">
            <div v-for="(color, index) in colors" 
                :style="{ backgroundColor: color }"
                class="w-8 h-8 m-1"
                @mouseover="changeItem(index)">
            </div>
          </div>

          <ul v-for="material in materials">
            <li class="text-sm">{{ material }}</li>
          </ul>

        </div>  

        <div class="cart-button">
          <button class="bg-blue-500 hover:bg-blue-700
                        text-white font-bold
                        py-2 px-4
                        rounded-full
                        self-end"
                  @click="addToCart"
                  :disabled="!variables[displayItem].hasStock"
                  :class="{'button--disabled': !variables[displayItem].hasStock}"
          >
            <span v-if="variables[displayItem].hasStock">Add to Cart</span>
            <span v-else>Sold out</span> 
          </button>
        </div>
      </div>
    </div>

    <div class="w-full mt-8 p-4">
      <ul class="flex border-b">
        <li class="mr-1">
          <a class="bg-white inline-block py-2 px-4 
                    text-blue-500 hover:text-blue-800 font-semibold" 
             href="#" 
             @click="showReviews = true"
             :class="{'text-blue-800': showReviews}"
          >
            Reviews
          </a>
        </li>
        <li class="mr-1">
          <a class="bg-white inline-block py-2 px-4 
                    text-blue-500 hover:text-blue-800 font-semibold" 
             href="#" 
             @click="showReviews = false"
             :class="{'text-blue-800': !showReviews}"
          >
            Add Review
          </a>
        </li>
      </ul>

      <div class="p-4 w-full h-full">
        <div v-if="showReviews">
          <review-list></review-list>
        </div>
        <div v-else>
          <review-form></review-form>
        </div>
      </div>

    </div>
  </div>
  `,
  data() {
    return {
      name: "Vue-Mastery Socks",
      materials: ["80% cotton", "20% polyester", "Gender-neutral"],
      variables: [
        {
          img:
            "https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg",
          hasStock: true,
          color: "#344861",
        },
        {
          img:
            "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
          hasStock: false,
          color: "#339E68",
        },
      ],
      displayItem: 0,
      showReviews: true,
    };
  },
  computed: {
    colors() {
      return this.variables.map((item) => item.color);
    },
  },
  methods: {
    changeItem(index) {
      this.displayItem = index;
    },
    addToCart() {
      this.$emit("add-to-cart", this.variables[this.displayItem].color);
    },
  },
});

// ------------------- Review List --------------------
Vue.component("review-list", {
  template: `
    <div>
      <ul v-for="review in reviews">
        <li class="text-sm text-gray-700">{{ review.rating }}<i class="fas fa-star"></i> {{ review.review }} ({{ review.name }})</{{></li>
      </ul>
    </div>
  `,
  data() {
    return {
      reviews: [
        {
          name: "TK",
          review: "This is a sample review",
          rating: 5,
        },
      ],
    };
  },
});

// ------------------- Review Form --------------------
Vue.component("review-form", {
  template: `
    <form class="w-full max-w-sm">
      
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="name">
            Name
          </label>
        </div>
        <div class="md:w-2/3">
          <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="name" type="text">
        </div>
      </div>

      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="review">
            Review
          </label>
        </div>
        <div class="md:w-2/3">
          <textarea class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="review" rows="5"></textarea>
        </div>
      </div>

      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="rating">
            Rating
          </label>
        </div>
        <div class="md:w-2/3">
          <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="rating" type="num" min="1" max="5">
        </div>
      </div>

      <div class="md:flex md:items-center">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
            Submit
          </button>
        </div>
      </div>
    </form>
  `,
});

// ------------------- Cart--------------------
Vue.component("cart", {
  props: {
    cart: {
      type: Array,
    },
  },
  template: `
    <div class="rounded-sm
                bg-blue-500 hover:bg-blue-700
                text-white font-bold
                w-16 h-8 m-2
                flex justify-center
    ">
      <span class="py-1"><i class="fas fa-shopping-cart"></i> {{cart.length}}</span>
    </div>
  `,
});

const app = new Vue({
  el: "#app",
  data: {
    cart: [],
  },
  methods: {
    updateCart(color) {
      this.cart.push(color);
    },
  },
});
