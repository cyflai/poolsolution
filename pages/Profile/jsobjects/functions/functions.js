export default {
	qubicVersion: ' qli-Client-1.8.5-Linux-x64.tar.gz',
	qubicScript: 'https://raw.githubusercontent.com/poolsolution/qubic/main/run.sh | bash -s --  1 2 ',
	qubicScriptUpdate: 'https://raw.githubusercontent.com/poolsolution/qubic/main/update.sh | bash -s --  1 2 ',
	runCmd: 'curl -fsSl ',
	supabaseUrl: 'https://afhvocspeeserasytprs.supabase.co',
	supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmaHZvY3NwZWVzZXJhc3l0cHJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4MjI0OTEsImV4cCI6MjAyMTM5ODQ5MX0.s0FtT89QeWCxTf8szuAtAyu8us0AZ5dhk6i13fMyvp8',
	sb: supabase.createClient(this.supabaseUrl,this.supabaseKey),
	checkToken: async () => {
		
			if (!appsmith.store.access_token) {
				navigateTo('Login')
			} else {
			console.log(appsmith.store.expires_at)
			selIdType.setSelectedOption(appsmith.store.idType)
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
			
				storeValue("wallet_address",inpAddress.text)
				await btnAdd.setDisabled(true)
				this.generateRunCmd()
				txtRunCmd.setTextColor("#3f3f46")
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
			if (!inpAddress.text) {
				showAlert("Please update your wallet address first","error")
			} else {
				copyToClipboard(txtRunCmd.text)
				showAlert("Run command copied!","success")
			}
	},
		copyUpdateCmd: async () => {
			if (!inpAddress.text) {
				showAlert("Please update your wallet address first","error")
			} else {
				copyToClipboard(txtUpdateCmd.text)
				showAlert("Run command copied!","success")
			}
	},
	generateRunCmd: () =>  {
		
			txtRunCmd.setText(this.runCmd +  this.qubicScript + appsmith.store.minerId + this.qubicVersion)
			txtUpdateCmd.setText(this.runCmd +  this.qubicScriptUpdate + appsmith.store.minerId + this.qubicVersion)

	},
	autoRefresh: async () => {
			setInterval(async ()=> await functions.refreshToken(),30000,"refreshToken")

	},
	refreshToken: async () => {
			await sign_in.run().then( data =>{
			
			Object.keys(data).forEach(i => {
					storeValue(i, data[i]);
			});
			console.log(appsmith.store.access_token)
		})
	},
	updateIDtype: async () => {
		
		if (!selIdType.selectedOptionValue) {
			showAlert("Mining type can not be empty","error")
			 if (appsmith.store.idType) {
				 selIdType.setSelectedOption(appsmith.store.idType)
			 }
			return
		}
		const { data, error } = await this.sb
							.from('userprofiles')
							.update({ idType: selIdType.selectedOptionValue })
							.eq('username', appsmith.store.username)
			.select()
		storeValue("idType",selIdType.selectedOptionValue)
		showAlert("Mining Type Updated successfully","success")
	}
}
	