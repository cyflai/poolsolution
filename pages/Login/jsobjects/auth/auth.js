export default {
	supabaseUrl: 'https://afhvocspeeserasytprs.supabase.co',
	supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmaHZvY3NwZWVzZXJhc3l0cHJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4MjI0OTEsImV4cCI6MjAyMTM5ODQ5MX0.s0FtT89QeWCxTf8szuAtAyu8us0AZ5dhk6i13fMyvp8',
	sb: supabase.createClient(this.supabaseUrl,this.supabaseKey),
	signIn: async () => {
		try{
				await sign_in.run().then(async data =>{
					
						storeValue("email",data.user.email)
						storeValue('username',inp_Username.text)
						// console.log(data.user)
						storeValue("password",inp_password.text)
				
						Object.keys(data).forEach(i => {
							storeValue(i, data[i]);
						});

					let { data: profileData, error } = await this.sb
  						.from('userprofiles')
  						.select('*').eq('username',inp_Username.text)
					
						storeValue('wallet_address',profileData[0].wallet_address)
						storeValue('idType',profileData[0].idType)
						storeValue('minerId',await functions.getMinerId(inp_Username.text))						
						await auth.refreshSolution()
						// navigateTo('Profile')	
					})
	     } catch(e) {
						showAlert(sign_in.data.error_description,'error')
     	}
	},
	signUp: async () => {
		try{
			
			if (inp_registerPassword.text != inp_registerPasswordConfirm.text) {
				showAlert("Password and confirmation password are not match",'error')
			}
			
			await sign_up.run();
			
			showAlert("Account created successfully",'success')
			
				const { data, error } = await this.sb
					.from('userprofiles')
					.insert([
					{ email: inp_registerUsername.text + '@obr.com.hk', username: inp_registerUsername.text, minerId: inp_registerUsername.text},
				])
				.select()
			
				console.log(data)
			
			functions.setDefaultTab('Sign In')
	
     }catch(e){
			 // showAlert(sign_up.data.msg,'error')
			 showAlert("Sign-up failed, please check your username, it can only contains letters",'error')
		 }
				
		},
		continue: async () =>{
		if(!appsmith.URL.fullPath.includes('#access_token=')) return;
		
		appsmith.URL.fullPath.split('#')[1].split('&').forEach(i => {
			const [key, value] = i.split('=')
			storeValue(key,value);
		});
		navigateTo('Page1');
	},
	refreshSolution: async () => {
		await getSolutions.run().then(data => {
			storeValue("solutions",data)
			
		})
	}
}