using UnityEngine;
using System.Collections.Generic;

public class MasterStateController {

	public static void fixOrientation() {
		Debug.Log("fixing orientation");
        Screen.orientation = ScreenOrientation.Portrait;
	}
}