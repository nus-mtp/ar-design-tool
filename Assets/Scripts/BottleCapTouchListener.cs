using UnityEngine;
using System.Collections;
using System;
using Vuforia;

public class BottleCapTouchListener : AbstractTouchListener {

	Transform pill;

	public override void touchHandler()
	{	pill= this.gameObject.transform.GetChild(0);
		pill.gameObject.SetActive (true);
	}
}
