using UnityEngine;
using System.Collections;

public class PillScript : MonoBehaviour {

	Component halo;
	private GameObject sample; //this should be the list of ingredients

	// Use this for initialization
	void Start () {
		halo = GetComponent ("Halo");
		halo.GetType().GetProperty("enabled").SetValue(halo, true, null);

		sample = GameObject.FindGameObjectWithTag("SampleUI");
		sample.SetActive (false);
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetMouseButtonDown(0)){
			Ray ray =Camera.main.ScreenPointToRay(Input.mousePosition);
			RaycastHit hit;
			if (Physics.Raycast(ray, out hit)){
				if(hit.collider.tag == "Pill")
				{	
					halo.GetType ().GetProperty ("enabled").SetValue (halo, false, null);
					GameObject obj=GameObject.FindGameObjectWithTag("Pill");
					sample.SetActive(true);
					Debug.Log ("Hit me!");
				
				}
				
			}
		}
	}
}
