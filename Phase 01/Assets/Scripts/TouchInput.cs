using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class TouchInput : MonoBehaviour {

	public LayerMask touchInputMask;

	private List<GameObject> touchList = new List<GameObject>();
	private GameObject[] touchesOld;
	private RaycastHit hit;
	
	// Update is called once per frame
	void Update () {
		//will only be compile in the unity
		if (Input.GetMouseButton(0) || Input.GetMouseButtonDown(0) || Input.GetMouseButtonUp(0)) {

			touchesOld = new GameObject[touchList.Count];
			touchList.CopyTo(touchesOld);
			touchList.Clear ();
			
			//to track all the touches that occur
			foreach (Touch touch in Input.touches) {
				Ray ray = GetComponent<Camera>().ScreenPointToRay (Input.mousePosition); //to know what object is colliding with the array
				
				
				//if we are hitting to the objet, we want to get output
				if (Physics.Raycast (ray, out hit, touchInputMask)) {
					
					GameObject recipient = hit.transform.gameObject;
					touchList.Add (recipient);
					
					if ( Input.GetMouseButtonDown(0) ) {
						recipient.SendMessage ("On touch down", hit.point, SendMessageOptions.DontRequireReceiver);
					}
					if (Input.GetMouseButtonUp(0)) {
						recipient.SendMessage ("On touch up", hit.point, SendMessageOptions.DontRequireReceiver);
					}
					if (Input.GetMouseButton(0)) {
						recipient.SendMessage ("On touch stay", hit.point, SendMessageOptions.DontRequireReceiver);
					}
					
				}
			}//end of the for loop
			
			//go through all gameObject
			foreach(GameObject g in touchesOld){
				if(!touchList.Contains(g)){
					g.SendMessage("On touch exit  ", hit.point, SendMessageOptions.DontRequireReceiver);
				}
			}
		}//end of the if loop

		//this is for android device
		if (Input.touchCount > 0) {

			touchesOld = new GameObject[touchList.Count];
			touchList.CopyTo(touchesOld);
			touchList.Clear();

			foreach (Touch touch in Input.touches) {
				Ray ray = GetComponent<Camera>().ScreenPointToRay (touch.position);

				if (Physics.Raycast (ray, out hit, touchInputMask)) {

					GameObject currentObject = hit.transform.gameObject;
					touchList.Add (currentObject);

					if (touch.phase == TouchPhase.Began) {
						currentObject.SendMessage ("OnTouchDown", hit.point, SendMessageOptions.DontRequireReceiver);
					}
					if (touch.phase == TouchPhase.Ended) {
						currentObject.SendMessage ("OnTouchUp", hit.point, SendMessageOptions.DontRequireReceiver);
					}
					if (touch.phase == TouchPhase.Canceled) {
						currentObject.SendMessage ("OnTouchExit", hit.point, SendMessageOptions.DontRequireReceiver);
					}
				}
			}

			foreach (GameObject g in touchesOld){
				if(!touchList.Contains (g)){
					g.SendMessage("OnTouchExit", hit.point, SendMessageOptions.DontRequireReceiver);
				}
			}
		}
	}
}
