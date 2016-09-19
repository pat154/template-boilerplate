class Navigation extends Module{

	createEvents(){
		$('.globalHeader-menuToggle, .globalHeader-closeMobileNav', this.$el).on('click', () => {
			$('.globalHeader-navigation').toggleClass('globalHeader-navigation_open');
		});
	}

	init(){
		this.createEvents();
	}

}