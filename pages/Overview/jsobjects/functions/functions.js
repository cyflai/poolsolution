export default {
	checkToken: () => {
			
			if (!appsmith.store.access_token) {
				navigateTo('Login')
			} else {
			return appsmith.store.access_token		
			}
		
	},	
}