using UnityEngine;
using System.Collections;

public class PillScript : MonoBehaviour {
	
	bool status = false;
	float jumpUpTime = 1.5f;
	float jumpDownTime = 1.5f;
	float jumpUpTimeCounter;
	float jumpDownTimeCounter;
	int noOfClick = 0;

	// Use this for initialization
	void Start () {
		this.gameObject.SetActive (false);    //to set the pill to be false during the start
		jumpUpTimeCounter = 0f;
		jumpDownTimeCounter = 0f;
	}
	
	// Update is called once per frame
	void Update () {
		status = BottleCapTouchListener.isClicked;
		if (status) {
			jumpUpAndDown ();
		} 
		resetTimeCounter ();
	}

	//to jump up and down of an object
	public void jumpUpAndDown(){
		if (jumpUpTimeCounter < jumpUpTime) {
			jumpUpTimeCounter += Time.deltaTime;
			transform.Translate (Vector3.up * 10 * Time.deltaTime, Space.World);
		} else {
			if (jumpDownTimeCounter < jumpDownTime) {
				jumpDownTimeCounter += Time.deltaTime;
				transform.Translate (Vector3.down * 10 * Time.deltaTime, Space.World);
			}
		}
	}

	//to reset the time counter
	public void resetTimeCounter(){
		if (jumpDownTimeCounter > 1.5f && jumpUpTimeCounter > 1.5f) {
			jumpDownTimeCounter = 0f;
			jumpUpTimeCounter = 0f;
		}
	}


}
