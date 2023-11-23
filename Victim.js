// JavaScript source code
class Victim extends Phaser.Physics.Arcade.Sprite
{
	direction = 0;
	moveEvent;

	constructor(scene, x, y, texture, frame)
	{
		super(scene, x, y, texture, frame)

		switch(texture) {
			case "person2":
			// code block
				this.anims.play('person2Motion');
			break;
			case "person3":
			// code block
				this.anims.play('person3Motion');
			break;
			case "person4":
			// code block
				this.anims.play('person4Motion');
			break;
			default:
				this.anims.play('person1Motion');
			// code block
		} 

		const randomDirection = (exclude) => {
			let newDirection = Phaser.Math.Between(0, 3)
			while (newDirection === exclude)
			{
				newDirection = Phaser.Math.Between(0, 3)
			}

			return newDirection
		}

		this.moveEvent = scene.time.addEvent({
			delay: 2000,
			callback: () => {
				this.direction = randomDirection(this.direction)
			},
			loop: true
		})
		this.direction = randomDirection(this.direction);
	}

	destroy(fromScene)
	{
		this.moveEvent.destroy()

		super.destroy(fromScene)
	}

	preUpdate(t, dt)
	{
		super.preUpdate(t, dt)

		const speed = 50

		switch (this.direction)
		{
			case 0:
				this.setVelocity(0, -speed)
				break

			case 1:
				this.setVelocity(0, speed)
				break

			case 2:
				this.setVelocity(-speed, 0)
				break

			case 3:
				this.setVelocity(speed, 0)
				break
		}
	}
}