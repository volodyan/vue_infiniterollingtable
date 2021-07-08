import Vue from 'vue'


Vue.filter('getIntData', function (val) {
  return parseInt(val);
})

Vue.filter('getYMD', function(input) {
	return input.split(' ')[0];
})