<template>
  <div class="errors">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
div.errors {
  background-color: rgb(207, 23, 23);
  padding: 12px;
  margin-bottom: 25px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-radius: 2px;

  & * {
    color: white;
    font-size: 17px;
  }
}
</style>
