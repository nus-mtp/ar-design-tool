using UnityEngine;
using System.Collections;
using System.IO;

public class ActionButton : MonoBehaviour {
	

	public static bool isShow = false;
	//private GameObject imageTarget;

	// Use this for initialization
	void Start ()
	{

	}

//	public void Snapshot ()
//	{
//		StartCoroutine (CaptureScreen ());
//	}
//	
//	public IEnumerator CaptureScreen ()
//	{
//		yield return null; // Wait till the last possible moment before screen rendering to hide the UI
//		
//		GameObject.Find ("Canvas").GetComponent<Canvas> ().enabled = false;
//		yield return new WaitForEndOfFrame (); // Wait for screen rendering to complete
//
//		if (Screen.orientation == ScreenOrientation.Portrait || Screen.orientation == ScreenOrientation.PortraitUpsideDown) {
//			isShow = true;
//		}
//		if (Screen.orientation == ScreenOrientation.LandscapeLeft || Screen.orientation == ScreenOrientation.LandscapeRight) {
//			isShow = true;
//		}
//
//		GameObject.Find ("Canvas").GetComponent<Canvas> ().enabled = true; // Show UI after we're done
//	}
	
	//to close the application itself
	public void close ()
	{
		Application.Quit ();
	}
}
