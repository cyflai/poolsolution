export default {
	supabaseUrl: 'https://afhvocspeeserasytprs.supabase.co',
	supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmaHZvY3NwZWVzZXJhc3l0cHJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4MjI0OTEsImV4cCI6MjAyMTM5ODQ5MX0.s0FtT89QeWCxTf8szuAtAyu8us0AZ5dhk6i13fMyvp8',
	sb: supabase.createClient(this.supabaseUrl,this.supabaseKey),
	signIn: async () => {
		try{
				await sign_in.run().then(data =>{

					storeValue("email",data.user.email)
					storeValue('username',inp_Username.text)
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
			
			const { data, error } = await this.sb
				.from('userprofiles')
				.insert([
				{ email: inp_registerUsername.text + '@obr.com.hk', username: inp_registerUsername.text },
			])
			.select()
			
			console.log(data)
			
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