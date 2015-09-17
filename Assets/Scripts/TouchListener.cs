using UnityEngine;
using System.Collections;
using Vuforia;

public class TouchListener : MonoBehaviour , ITrackableEventHandler {

	TrackableBehaviour trackable;
	private GameObject panel;
	private GameObject pill;
	private GameObject click;
	private GameObject sample;

	// Use this for initialization
	void Start () {
		trackable = (TrackableBehaviour)UnityEngine.Object.FindObjectOfType(typeof(TrackableBehaviour));
		panel = GameObject.FindGameObjectWithTag("Panel");
		pill = GameObject.FindGameObjectWithTag ("Pill");
		click = GameObject.FindGameObjectWithTag ("ClickMe");

		panel.SetActive (true);
		pill.SetActive (false);

		trackable.RegisterTrackableEventHandler(this);
	}
	
	void Update () {
		if (Input.GetMouseButtonDown(0)){ 
			Ray ray =Camera.main.ScreenPointToRay(Input.mousePosition);
			RaycastHit hit;
			if (Physics.Raycast(ray, out hit)){
				if(hit.collider.tag == "BottleCap")
				{
					GameObject obj=GameObject.FindGameObjectWithTag("BottleCap");
					Debug.Log ("Yeah i can click on it" + obj.name);
					pill.SetActive(true);
					click.SetActive(false);
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
