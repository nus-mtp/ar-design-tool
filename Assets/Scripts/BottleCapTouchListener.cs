using UnityEngine;
using System.Collections;
using System;
using Vuforia;

public class BottleCapTouchListener : AbstractTouchListener {
	Component halo;
	Transform pill;

	bool statusTracked;
	public static bool isClicked = false;
	private GameObject arrow;

	float switchOnTime = 1.5f;
	float switchOffTime = 1.5f;
	float switchOnCounter;
	float switchOffCounter;

	float jumpUpTime = 1.5f;
	float jumpDownTime = 1.5f;
	float jumpUpTimeCounter;
	float jumpDownTimeCounter;

	void Start(){
		halo = GetComponent ("Halo");
		switchOnCounter = 0f;
		switchOffCounter = 0f;
		arrow = GameObject.Find ("Arrow");
	}

	void Update(){
		statusTracked = TouchController.objectIsFound;
		setHalo (false);

		if (statusTracked) {
			flickering ();
			jumpUpAndDown();
			resetTimeCounter();
		}

		if (isClicked == true) {
			setHalo (false);
			arrow.SetActive(false);
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

	//to jump up and down of an object
	public void jumpUpAndDown(){
		if (jumpUpTimeCounter < jumpUpTime) {
			jumpUpTimeCounter += Time.deltaTime;
			arrow.transform.Translate (Vector3.up * 10 * Time.deltaTime, Space.World);
		} else {
			if (jumpDownTimeCounter < jumpDownTime) {
				jumpDownTimeCounter += Time.deltaTime;
				arrow.transform.Translate (Vector3.down * 10 * Time.deltaTime, Space.World);
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
		if (jumpDownTimeCounter > 1.5f && jumpUpTimeCounter > 1.5f) {
			jumpDownTimeCounter = 0f;
			jumpUpTimeCounter = 0f;
		}
	}


}
