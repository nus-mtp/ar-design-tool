using UnityEngine;
using System.Collections;
using System.IO;

public class Userinterfacebutton : MonoBehaviour {
	bool buttonClicked = false;
	private GameObject item;

	// Use this for initialization
	void Awake () {
		item = GameObject.FindGameObjectWithTag ("Zinc");
		item.SetActive (false);
	}
	
	// Update is called once per frame
	void Update () {
		if (buttonClicked) {
			ShowItem();
		}
	}

	public void IsShow(){
		buttonClicked = true;
	}

	public void ShowItem(){
		item.SetActive (true);
	}
	
}
