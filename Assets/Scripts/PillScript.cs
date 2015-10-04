using UnityEngine;
using System.Collections;

public class PillScript : MonoBehaviour {

	Component halo;
	//private bool status;

	// Use this for initialization
	void Start () {
		halo = GetComponent ("Halo");
		halo.GetType().GetProperty("enabled").SetValue(halo, true, null);
		this.gameObject.SetActive (false);    //to set the pill to be false during the start

		//status = TouchController.hasbeenClicked;
		//sample = GameObject.FindGameObjectWithTag("SampleUI");
		//sample.SetActive (false);
	}

	public void SetToShow(bool status){
		this.gameObject.SetActive (status);
		Debug.Log ("I've shown the pill");
	}
	// Update is called once per frame
	void Update () {
//		if (Input.GetMouseButtonDown(0)){
//			halo.GetType ().GetProperty ("enabled").SetValue (halo, false, null);
//			Debug.Log ("hit me");
//
//		}
	}
}
