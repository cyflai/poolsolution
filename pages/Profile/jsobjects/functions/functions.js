export default {
	supabaseUrl: 'https://afhvocspeeserasytprs.supabase.co',
	supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmaHZvY3NwZWVzZXJhc3l0cHJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4MjI0OTEsImV4cCI6MjAyMTM5ODQ5MX0.s0FtT89QeWCxTf8szuAtAyu8us0AZ5dhk6i13fMyvp8',
	sb: supabase.createClient(this.supabaseUrl,this.supabaseKey),
	checkToken: () => {
		
			if (!appsmith.store.access_token) {
				navigateTo('Login')
			} else {
			return appsmith.store.access_token		
			}
		
	},
	updateWalletAddr: async () => {
		try{
			if (inpAddress.text == "") {
				showAlert("Wallet ddress can't be empty, please input your Wallet address and update again", 'error')
				return
			} 
			await this.sb
				.from('userprofiles')
				.update({ wallet_address: inpAddress.text })
				.eq('email', appsmith.store.email)
			
				await btnAdd.setDisabled(true)
		  	showAlert("Wallet Address successfully updated",'success')
     }catch(error){
			showAlert("Failed to update Wallet Address, Please try again later",'error')
			console.log(error.message)
     }
	},
	enableUpdateBtn: async ()=>{
		await btnAdd.setDisabled(false)
	},
		disableUpdateBtn: async ()=>{
		await btnAdd.setDisabled(true)
	},
		copyRunCmd: async () => {
		copyToClipboard(txtRunCmd.text)
			showAlert("Run command copied!","success")
	}
	// startup: async () => {
		// if ( inpAddress.text == "") {
			// btnAdd.setLabel("Add")
		// } else {
			// btnAdd.setLabel("Edit")
		// }
	// }
}