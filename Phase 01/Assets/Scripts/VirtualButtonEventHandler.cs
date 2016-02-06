using UnityEngine;
using System.Collections.Generic;
using Vuforia;

public class VirtualButtonEventHandler : MonoBehaviour, IVirtualButtonEventHandler  {

	private GameObject zinc;
	private GameObject interactiveButton;
	// Use this for initialization
	void Start() {
		
		// Search for all Children from this ImageTarget with type VirtualButtonBehaviour
		VirtualButtonBehaviour[] vbs = GetComponentsInChildren<VirtualButtonBehaviour>();
		for (int i = 0; i < vbs.Length; ++i) {
			// Register with the virtual buttons TrackableBehaviour
			vbs[i].RegisterEventHandler(this);
		}
		
		// Find the models based on the names in the Hierarchy
		zinc = transform.FindChild("Zinc").gameObject;

		interactiveButton = transform.FindChild("TrackingSystem").gameObject;

		// We don't want to show Jin during the startup
		zinc.SetActive(false);
		interactiveButton.SetActive(true);
	}

	/// <summary>
	/// Called when the virtual button has just been pressed:
	/// </summary>
	public void OnButtonPressed(VirtualButtonAbstractBehaviour vb) {
		//Debug.Log(vb.VirtualButtonName);
		Debug.Log("Button pressed!");
		
		switch(vb.VirtualButtonName) {
		case "VirtualButton":
			interactiveButton.SetActive(true);
			zinc.SetActive(true);
			break;
	
		default:
			throw new UnityException("Button not supported: " + vb.VirtualButtonName);
			break;
		}

	}

	/// Called when the virtual button has just been released:
	public void OnButtonReleased(VirtualButtonAbstractBehaviour vb) { 
		Debug.Log("Button released!");
	}
}
