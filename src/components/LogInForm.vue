<template>
  <div class="container d-flex flex-column justify-content-center align-items-center ">
    <div class="box  d-flex flex-column bg-white rounded shadow p-3 mb-5 bg-white rounded">
      <h1 class="m-4 text-center text-uppercase">sign in</h1>
      <form class="form-container mx-4 mt-4 d-flex flex-column" @submit.prevent="submitForm">
        <div class="form-group mb-4">
          <label for="emailInput " class="form-label fw-bolder">Email </label>
          <input
            type="email"
            class="form-control "
            :class="{ 'is-invalid': !email.isValid }"
            id="emailInput"
            v-model.trim="email.value"
            @blur="clearValidity('email')"
          />
          <div :class="{ 'invalid-feedback .bg-danger ': !email.isValid }" v-if="!email.isValid">
            Please enter correct email!
          </div>
        </div>
        <div class="form-group mb-4">
          <label for="passwordInput" class="form-label fw-bolder">Password</label>
          <input
            type="password"
            class="form-control "
            id="passwordInput"
            v-model="password.value"
            @blur="clearValidity('password')"
          />
          <div class="valid-feedback">najs</div>
        </div>
        <button type="submit" class=" btn  mt-5 mb-3 btn-secondary text-uppercase border-0 rounded-20 fw-bold">
          login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const email = reactive({ value: '', isValid: true });
    const password = reactive({ value: '', isValid: true });
    const formIsValid = ref(true);

    function clearValidity(input) {
      this[input].isValid = true;
    }
    function validateForm() {
      formIsValid.value = true;
      if (email.value === '') {
        email.isValid = false;
        formIsValid.value = false;
      }
      if (password.value === '') {
        password.isValid = false;
        formIsValid.value = false;
      }
    }
    function submitForm() {
      validateForm();
      if (!formIsValid.value) {
        return;
      }
      console.log('siema');
    }
    return {
      email,
      password,
      clearValidity,
      formIsValid,
      validateForm,
      submitForm,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  .box {
    width: 25vw;
    .form-container {
      button {
        transition: 0.1s;
        letter-spacing: 0.15rem;
      }
      button:hover {
        transform: scale(1.01);
      }
    }
  }
}
</style>
