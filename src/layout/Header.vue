<template>
  <header class="header">
    <!-- logo组件 -->
    <div class="logo">
      <router-link to="/Home">
        <img alt="logo" src="../assets/images/logo.png" />
      </router-link>
    </div>

    <!-- 导航 -->
    <nav class="menu">
      <router-link to="/" class="nav-link" active-class="select">
        Welcome
      </router-link>
      <router-link to="/Home" class="nav-link" active-class="select">
        Home
      </router-link>
      <router-link to="/blog" class="nav-link" active-class="select">
        Blog
      </router-link>
      <router-link to="/about" class="nav-link" active-class="select">
        About
      </router-link>
    </nav>

  </header>
</template>

<script>
  export default {
    name: 'Header',
  };
</script>

<style scoped>

  .nav-link {
    /* override default link underline */
    text-decoration: none;
  }


  .header {
    margin: 25px auto;
    min-width: 975px;
    max-width: 55%;
    height: 100px;
    /* 使用 flex 布局来对齐 */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header .logo {
    display: flex;
    align-items: center;
    margin-left: 47px;
    margin-top: 0;
  }

  .header .logo span {
    padding-left: 5px;
    font-size: 22pt;
    font-family: 'Conv_FuturaStd-Heavy', Arial;
    color: #68525B;
  }


  .header .logo img {
    vertical-align: text-bottom;
  }



  .header .menu {
    display: flex;
    align-items: center;
    padding-right: 37px;
    position: relative;
    padding-top: 0;
  }

  .header .menu a {
    margin-right: 35px;
    font-size: 14pt;
    font-family: 'Conv_FuturaStd-Medium', Arial;
    color: #68525B;
  }

  /* 菜单高亮 */
  .menu a.select {
    color: #E45462;
    text-decoration: none;
  }

  .header .menu a:last-child {
    margin-right: 0;
  }



</style>