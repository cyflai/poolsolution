export default {
	checkToken: () => {
		
			if (!appsmith.store.access_token) {
				navigateTo('Login')
			}
	},	
}