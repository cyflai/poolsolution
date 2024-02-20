export default {
	checkToken: () => {
		
			if (!appsmith.store.access_token) {
				navigateTo('Login')
			} else {
			// console.log(appsmith.store.expires_at)
			
			return appsmith.store.access_token		
			}
		
	}
}