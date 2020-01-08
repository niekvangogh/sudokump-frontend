import Vue from 'vue';
export default function ({ }, inject) {
    const EventBus = new Vue();
    inject("sudokuManager", EventBus)
}
