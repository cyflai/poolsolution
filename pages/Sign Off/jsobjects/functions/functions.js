export default {
	async signOff () {
		try{
			console.log(appsmith.store.access_token);
			sign_off.run().catch();
      clearStore(); // removing all the stored values
			signoffTxt.setText("Signed Off");
     }catch(error){

     }
			

	}
}