/*****************
	Generic module class
*****************/
class Module {
	constructor($el, options){
		this.opts = options;
		this.$el = $el;
	}

	getElement(){
		return this.$el;
	}
}