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
	signUp: () => {
		return sign_up.run(
			{"email": inp_registerEmail.text,
			 "password": inp_registerPassword.text
			}).then(() => showAlert('Account created sucessfully!','success')).then(()=> {
			
			functions.setDefaultTab('Sign In')
		})
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