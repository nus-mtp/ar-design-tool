using UnityEngine;
using System.Collections;

public class PillScript : MonoBehaviour {
	bool status = false;
	float jumpUpTime = 1.5f;
	float jumpDownTime = 1.5f;
	float jumpUpTimeCounter;
	float jumpDownTimeCounter;

    //to jump up and down of an object
    public void jumpUpAndDown(){
		if (jumpUpTimeCounter < jumpUpTime) {
			jumpUpTimeCounter += Time.deltaTime;
			transform.Translate (Vector3.up * 5 * Time.deltaTime, Space.World);
		} else {
			if (jumpDownTimeCounter < jumpDownTime) {
				jumpDownTimeCounter += Time.deltaTime;
				transform.Translate (Vector3.down * 5 * Time.deltaTime, Space.World);
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

    private float timeSinceAppear = 0.0f;

    public void Update()
    {
        if (BottleCapTouchListener.isClicked)
            pop();
        resetTimeCounter();
    }

    private void pop()
    {
        timeSinceAppear += Time.deltaTime;
        if (timeSinceAppear <= 1.50f)
            transform.Translate(Vector3.up * (1.50f - 2.0f * timeSinceAppear), Space.World);
        else
            jumpUpAndDown();
    }
}
