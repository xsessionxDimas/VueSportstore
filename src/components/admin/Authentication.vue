<template>
    <div class="m-2">
        <h4 class="bg-primary text-white text-center p-2">SportsStore Administration</h4>
        <h4 v-if="showFailureMessage" class="bg-danger text-white text-center p-2 my-2">
            Authentication Failed. Please try again.
        </h4>
        <div class="form-group">
            <label>Username</label>
            <input v-model="$v.username.$model" class="form-control">
            <validation-error v-bind:validation="$v.username"></validation-error>
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" v-model="$v.password.$model" class="form-control">
            <validation-error v-bind:validation="$v.password"></validation-error>
        </div>
        <div class="text-center">
            <button class="btn btn-primary" v-on:click="handleAuth">Log In</button>
        </div>
    </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";
import ValidationError from "../ValidationError";
 

export default {
    components : { ValidationError },
    data: function() {
        return {
            username: "admin",
            password: "secret",
            showFailureMessage: false
        }
    },
    validations: {
        username: { required },
        password: { required }
    },
    computed: {
        ...mapState({
            "authenticated": state => state.auth.isAuthenticated
        })
    },
    methods : {
        ...mapActions(["authenticate"]),
        async handleAuth(){
            this.$v.$touch();
            if(!this.$v.$invalid){
                await this.authenticate({
                    name: this.username,
                    password: this.password
                });
                if(this.authenticated) {
                    this.$router.push("/admin");
                } else {
                    this.showFailureMessage = true;
                }
            }
        }
    }
}
</script>
