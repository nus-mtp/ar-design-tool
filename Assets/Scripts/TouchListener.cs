using UnityEngine;
using System.Collections;
using Vuforia;

public class TouchListener : MonoBehaviour , ITrackableEventHandler {

	TrackableBehaviour trackable;
	private GameObject panel;


	// Use this for initialization
	void Start () {
		trackable = (TrackableBehaviour)UnityEngine.Object.FindObjectOfType(typeof(TrackableBehaviour));
		panel = GameObject.FindGameObjectWithTag("Panel");
		panel.SetActive (true);

		trackable.RegisterTrackableEventHandler(this);
	}
	
	void Update () {
		if (Input.GetMouseButtonDown(0)){ // if left button pressed...
			Ray ray =Camera.main.ScreenPointToRay(Input.mousePosition);
			RaycastHit hit;
			if (Physics.Raycast(ray, out hit)){
				if(hit.collider.tag == "Zinc")
				{
					GameObject obj=GameObject.FindGameObjectWithTag("Zinc");
					//Debug.Log ("Yeah i can click on it" + obj.name);
					//informationTextbox.SetActive (true);
				}
				if(hit.collider.tag == "Ginger"){
					GameObject obj=GameObject.FindGameObjectWithTag("Ginger");
					//Debug.Log ("Yeah yo!");
					//informationTextbox.SetActive (true);
				}
				if(hit.collider.tag == "VitA"){
					GameObject obj=GameObject.FindGameObjectWithTag("VitA");
					//Debug.Log ("Yeah vitA!");
					//informationTextbox.SetActive (true);
				}
			}
		}
	}

	// Called when the trackable state has changed.
	public void OnTrackableStateChanged(TrackableBehaviour.Status previousStatus,TrackableBehaviour.Status newStatus){
		
		if( newStatus == TrackableBehaviour.Status.DETECTED || newStatus == TrackableBehaviour.Status.TRACKED ){
			panel.SetActive(false);
		}else{
			panel.SetActive(true);
		}
	}
	
}
