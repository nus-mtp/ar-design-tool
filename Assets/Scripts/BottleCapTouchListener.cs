using UnityEngine;
using System.Collections;
using System;
using Vuforia;

public class BottleCapTouchListener : AbstractTouchListener {
	Component halo;
	Transform pill;
	bool statusTracked;
	public static bool isClicked = false;

	float switchOnTime = 1.5f;
	float switchOffTime = 1.5f;
	float switchOnCounter;
	float switchOffCounter;

	void Start(){
		halo = GetComponent ("Halo");
		switchOnCounter = 0f;
		switchOffCounter = 0f;
	}

	void Update(){
		statusTracked = TouchController.objectIsFound;
		setHalo (false);

		if (statusTracked) {
			flickering ();
			resetTimeCounter();
		}

		if (isClicked == true) {
			setHalo (false);
		}

	}

	public void setHalo (bool status){
		halo.GetType ().GetProperty ("enabled").SetValue (halo, status, null);
	}

	public void flickering(){
		if (switchOnCounter < switchOnTime) {
			switchOnCounter += Time.deltaTime;
			setHalo (true);
		} else {
			if(switchOffCounter < switchOffTime){
				switchOffCounter += Time.deltaTime;
				setHalo (false);
			}
		}
	}

	public override void touchHandler()
	{	pill= this.gameObject.transform.GetChild(0);
		pill.gameObject.SetActive (true);

		//disable the glow
		isClicked = true;
	}

	//to reset the time counter
	public void resetTimeCounter(){
		if (switchOffCounter > 1.5f && switchOnCounter > 1.5f) {
			switchOnCounter = 0f;
			switchOffCounter = 0f;
		}
	}
}
