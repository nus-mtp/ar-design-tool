using UnityEngine;
using System.Collections;

public class TouchListener : MonoBehaviour {
	private GameObject informationTextbox;

	// Use this for initialization
	void Start () {
		informationTextbox = GameObject.FindGameObjectWithTag("infoTextbox");
		informationTextbox.SetActive (false);
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
					informationTextbox.SetActive (true);
				}
				if(hit.collider.tag == "Ginger"){
					GameObject obj=GameObject.FindGameObjectWithTag("Ginger");
					//Debug.Log ("Yeah yo!");
					informationTextbox.SetActive (true);
				}
				if(hit.collider.tag == "VitA"){
					GameObject obj=GameObject.FindGameObjectWithTag("VitA");
					//Debug.Log ("Yeah vitA!");
					informationTextbox.SetActive (true);
				}
			}
		}
	}
	
}
