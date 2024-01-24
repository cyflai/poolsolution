export default {
	signIn: () => {
		return sign_in.run().then(data =>{
		
			storeValue("email",data.user.email)
			delete data.user;
			
			Object.keys(data).forEach(i => {
				storeValue(i, data[i]);
			});
		}).then(()=> navigateTo('Profile'))
	},
	continue: async () =>{
		
		if(!appsmith.URL.fullPath.includes('#access_token=')) return;
		
		appsmith.URL.fullPath.split('#')[1].split('&').forEach(i => {
			const [key, value] = i.split('=')
			storeValue(key,value);
		});
		navigateTo('Page1');
		
	}
}