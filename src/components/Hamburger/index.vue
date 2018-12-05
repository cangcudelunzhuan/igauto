<template>
  <div>
    <!-- <svg t="1492500959545" @click="toggleClick" class="svg-icon hamburger" :class="{'is-active':isActive}" style="" viewBox="0 0 1024 1024"
      version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">
      <path d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"
        p-id="1692"></path>
      <path d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"
        p-id="1693"></path>
      <path d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"
        p-id="1694"></path>
    </svg> -->
    <svg t="1521103450911" @click="toggleClick" class="svg-icon hamburger" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1264" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20">
      <path d="M912.0256 128a47.9744 47.9744 0 1 1 0 96H112.0256a48.0256 48.0256 0 0 1 0-96h799.9488z m0 336.0256a47.9744 47.9744 0 1 1 0 95.9488H432.0256a47.9744 47.9744 0 1 1 0-95.9488h479.9488zM242.688 355.5328A7.9872 7.9872 0 0 1 256 361.6256v300.3392a7.9872 7.9872 0 0 1-13.2608 5.9904l-165.1712-143.872a16.0256 16.0256 0 0 1 0-24.1664l165.1712-144.3328z m669.2864 444.416a47.9744 47.9744 0 1 1 0 96H112.0256a47.9744 47.9744 0 1 1 0-96h799.9488z" p-id="1265"></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
.hamburger {
    display: inline-block;
    cursor: pointer;
    width: 20px;
    height: 20px;
    transform: rotate(0deg);
    transition: .38s;
    transform-origin: 50% 50%;
}

.hamburger.is-active {
    transform: rotate(90deg);
}
</style>
