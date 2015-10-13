using UnityEngine;
using System.Collections;
using System;
using Vuforia;

public class BottleCapTouchListener : AbstractTouchListener {
	Component halo;
	Transform pill;
	bool statusTracked;
	public static bool isClicked = false;

	void Start(){
		halo = GetComponent ("Halo");
	}

	void Update(){
		statusTracked = TouchController.objectIsFound;
		setHalo (statusTracked);

		if (isClicked == true) {
			setHalo (false);
		}

        Debug.Log(CameraProperties.fget(CameraProperties.EULER_ROTATION_Z));
	}

	public void setHalo (bool status){
		halo.GetType().GetProperty("enabled").SetValue(halo, status, null);
	}

	public override void touchHandler()
	{	pill= this.gameObject.transform.GetChild(0);
		pill.gameObject.SetActive (true);

		//disable the glow
		isClicked = true;
	}
}
