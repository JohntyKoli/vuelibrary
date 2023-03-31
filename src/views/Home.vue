<template>
    
    <div>
        <h2>This is HOme</h2>
    </div>


</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'Home',
    computed:{
        ...mapGetters(['user'])
    }
}
</script>