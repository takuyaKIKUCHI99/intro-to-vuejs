Vue.component("product", {
  template: `
  <div class="card">
    <img class="card__img" 
         :src="variables[displayItem].img" 
         :class="{'card__img--inactive': !variables[displayItem].hasStock}">
    </img>
    <div class="card__info">
      <h1>{{ name }}</h1>
      <p v-if="variables[displayItem].hasStock">In Stock</p>
      <p v-else>Out of Stock</p>
      <div class="color-selection">
        <div v-for="(color, index) in colors" 
             :style="{ backgroundColor: color }"
             class="color-box"
             @mouseover="changeItem(index)">
        </div>
      </div>
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
  },
});

const app = new Vue({
  el: "#app",
});
