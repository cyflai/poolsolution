export default {
	signIn: async () => {
		try{
				await sign_in.run().then(data =>{

					storeValue("email",data.user.email)
					delete data.user;

					Object.keys(data).forEach(i => {
						storeValue(i, data[i]);
					});

				}).then(()=> navigateTo('Profile'))
			
     }catch(e){
				showAlert(sign_in.data.error_description,'error')
     }

	},
	signUp: async () => {
		try{
				await sign_up.run();
			
			showAlert("Account created successfully",'success')
			
			functions.setDefaultTab('Sign In')
	
     }catch(e){
			 showAlert(sign_up.data.msg,'error')
		 }
				
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