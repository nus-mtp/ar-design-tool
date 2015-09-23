using UnityEngine;
using System.Collections;

public class PillScript : MonoBehaviour {

	Component halo;
	private bool status;

	//private GameObject sample; //this should be the list of ingredients

	// Use this for initialization
	void Start () {
		halo = GetComponent ("Halo");
		halo.GetType().GetProperty("enabled").SetValue(halo, true, null);

		status = TouchListener.hasbeenClicked;
		//sample = GameObject.FindGameObjectWithTag("SampleUI");
		//sample.SetActive (false);
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetMouseButtonDown(0)){
			if(status == false){
				halo.GetType ().GetProperty ("enabled").SetValue (halo, false, null);
				Debug.Log ("hit me");
			}

		}
	}
}
