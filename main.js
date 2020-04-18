Vue.component("product", {
  template: `
  <div class="card md:flex m-4">

    <img class="card__img w-64 shadow-md" 
         :src="variables[displayItem].img" 
         :class="{'card__img--inactive': !variables[displayItem].hasStock}">
    </img>

    <div class="card__info p-4 w-full relative">

      <p class="text-2xl">{{ name }}</p>

      <p v-if="variables[displayItem].hasStock">In Stock</p>
      <p v-else>Out of Stock</p>

      <div class="flex">
        <div v-for="(color, index) in colors" 
             :style="{ backgroundColor: color }"
             class="w-8 h-8 m-1"
             @mouseover="changeItem(index)">
        </div>
      </div>

      <button class="bg-blue-500 hover:bg-blue-700
                    text-white font-bold
                    py-2 px-4
                    rounded-full
                    absolute bottom-0"
              @click="addToCart"
              :disabled="!variables[displayItem].hasStock"
              :class="{'button--disabled': !variables[displayItem].hasStock}"
      >
        Add to Cart
      </button>

    </div>
  </div>
  `,
  data() {
    return {
      name: "Vue-Mastery Socks",
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
      console.log("added to cart");
    },
  },
});

const app = new Vue({
  el: "#app",
});
