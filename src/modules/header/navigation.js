class Navigation extends Module{

	mobileNav(){
		$('.globalHeader-menuToggle, .globalHeader-closeMobileNav', this.$el).on('click', () => {
			$('.globalHeader-navigation').toggleClass('globalHeader-navigation_open');
		});
	}

	init(){
		this.mobileNav();
	}

}