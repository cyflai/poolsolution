export default {
	supabaseUrl: 'https://afhvocspeeserasytprs.supabase.co',
	supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmaHZvY3NwZWVzZXJhc3l0cHJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4MjI0OTEsImV4cCI6MjAyMTM5ODQ5MX0.s0FtT89QeWCxTf8szuAtAyu8us0AZ5dhk6i13fMyvp8',
	sb: supabase.createClient(this.supabaseUrl,this.supabaseKey),
	checkToken: () => {
		
			if (!appsmith.store.access_token) {
				navigateTo('Login')
			} else {
			return appsmith.store.access_token		
				appsmith.store
			}
		
	},	
	autoRefresh: async () => {
	setInterval(async () => await functions.getScore(),300000,"getScore")
	setInterval(async ()=> await functions.refreshToke(),30000,"refreshToken")
	setInterval(async ()=> await functions.refreshSolution(),30000,"refreshSolution")
	setInterval(async ()=> await functions.refreshToke(),30000, "reloadPage")
	},
	refreshToke: async () => {
		await sign_in.run().then( data =>{
			
			Object.keys(data).forEach(i => {
					storeValue(i, data[i]);
			});
			// console.log(appsmith.store.access_token)
		})
	},
	refreshSolution: async () => {
		await getSolutions.run().then(data => {
			storeValue("solutions",data)
			
		})
	},
	getScore: async () => {
		await getScore.run().then(data => {
			if (data) {
				storeValue('score',data[0].score)
			} else {
				storeValue('score'," ")
			}
		})
	},
	reloadPage: async ()=>{
		await navigateTo("Miner Configuration")
	}
}