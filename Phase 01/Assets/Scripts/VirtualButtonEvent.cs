using UnityEngine;
using System.Collections.Generic;
using Vuforia;

public class VirtualButtonEvent : MonoBehaviour, IVirtualButtonEventHandler {

	private GameObject Ingredients;
	bool isActive = false;
	// register buttons for event handling
	void Start() {

		// Search for all Children from this ImageTarget with type VirtualButtonBehaviour
		VirtualButtonBehaviour[] vbs = GetComponentsInChildren<VirtualButtonBehaviour>();
		for (int i = 0; i < vbs.Length; ++i) { 
			// Register with the virtual buttons TrackableBehaviour
			vbs[i].RegisterEventHandler(this); 
		}

		Ingredients = transform.FindChild("Ingredients").gameObject;
		//Debug.Log ("Ingredients not activated");
		Ingredients.SetActive (false);
	}
	// button is "pressed" so change color of Sphere
	public void OnButtonPressed(VirtualButtonAbstractBehaviour vb) {
		if (vb.VirtualButtonName == "VirtualButton") {
			//Debug.Log ("Ingredients activated");
			if(isActive == false){
				Ingredients.SetActive (true);
				isActive = true;
			}else{
				Ingredients.SetActive (false);
				isActive = false;
			}

		}

	}
	// change Sphere back to white
	public void OnButtonReleased(VirtualButtonAbstractBehaviour vb) {
		//Debug.Log ("There is no interaction");
	}
}
